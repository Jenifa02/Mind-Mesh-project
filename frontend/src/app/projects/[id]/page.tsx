
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import type { Project } from "../../../lib/api";

export default function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchProject() {
     try {
      const response = await apiFetch(`/projects/${id}`, {
        cache: "no-store",
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to load project.");
      }

      const data: Project = await response.json();

      if (active) setProject(data);

      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Something went wrong."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (id) void fetchProject();

    return () => {
      active = false;
    };
  }, [id, router]);

  if (loading) {
    return <main className="p-8">Loading project...</main>;
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => router.push("/projects")}
          className="mt-4 rounded bg-indigo-600 px-4 py-2 text-white"
        >
          Back to Projects
        </button>
      </main>
    );
  }

  if (!project) return null;

  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-sm">
        <button
          onClick={() => router.push("/projects")}
          className="mb-6 text-indigo-600"
        >
          ← Back to Projects
        </button>

        <h1 className="text-3xl font-bold">{project.title}</h1>

        <p className="mt-4 whitespace-pre-wrap text-slate-600">
          {project.description || "No description added."}
        </p>

        <section className="mt-8 border-t pt-5">
          <h2 className="mb-3 text-lg font-semibold">
            Project Metadata
          </h2>

          <p className="break-all text-sm">
            <strong>Project ID:</strong> {project.id}
          </p>

          <p className="mt-2 text-sm">
            <strong>Created:</strong>{" "}
            {project.created_at
              ? new Date(project.created_at).toLocaleDateString()
              : "Not available"}
          </p>
        </section>
      </div>
    </main>
  );
}
