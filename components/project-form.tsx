"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

const projectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image_url: z.string().url("Must be a valid URL"),
  link: z.string().url("Must be a valid URL"),
  tags: z.string().transform(str => str.split(",").map(s => s.trim())),
});

interface ProjectFormProps {
  project?: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    tags: string[];
    link: string;
  };
  onSuccess: () => void;
}

export function ProjectForm({ project, onSuccess }: ProjectFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      image_url: project?.image_url || "",
      link: project?.link || "",
      tags: project?.tags.join(", ") || "",
    },
  });

  
  const onSubmit = async (data: { title: string; description: string; image_url: string; link: string; tags: string }) => {
    setIsSubmitting(true);
    try {
      const formattedData = {
        ...data,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
      };

      if (project) {
        await supabase
          .from("projects")
          .update({
            ...formattedData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", project.id);
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        await supabase
          .from("projects")
          .insert([
            {
              ...formattedData,
              user_id: user?.id,
            },
          ]);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving project:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Input
          placeholder="Project Title"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>

      <div>
        <Textarea
          placeholder="Project Description"
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.description.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Image URL"
          {...form.register("image_url")}
        />
        {form.formState.errors.image_url && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.image_url.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Project Link"
          {...form.register("link")}
        />
        {form.formState.errors.link && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.link.message}</p>
        )}
      </div>

      <div>
        <Input
          placeholder="Tags (comma-separated)"
          {...form.register("tags")}
        />
        {form.formState.errors.tags && (
          <p className="text-sm text-destructive mt-1">{form.formState.errors.tags.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Saving..." : (project ? "Update Project" : "Add Project")}
      </Button>
    </form>
  );
}