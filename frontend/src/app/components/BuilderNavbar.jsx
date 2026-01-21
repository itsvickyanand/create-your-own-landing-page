"use client";

import { useEffect, useState } from "react";

// APIs
import * as orgApi from "@/lib/api/organizations.api";
import * as projectApi from "@/lib/api/projects.api";
import * as pageApi from "@/lib/api/pages.api";
import * as componentApi from "@/lib/api/components.api";
import * as elementApi from "@/lib/api/elements.api";

function Dropdown({
  label,
  items,
  selected,
  onSelect,
  onCreate,
  onDelete,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <button
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="rounded bg-gray-900 px-3 py-1 text-sm text-white disabled:opacity-40"
      >
        {label}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-60 rounded border bg-white p-2 shadow">
          <div className="mb-2 max-h-40 overflow-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between rounded px-2 py-1 ${
                  selected?.id === item.id ? "bg-gray-200" : ""
                }`}
              >
                <span
                  className="cursor-pointer text-sm"
                  onClick={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                >
                  {item.name || item.type}
                </span>

                <button
                  onClick={() => onDelete(item.id)}
                  className="text-xs text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-1">
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`New ${label}`}
              className="flex-1 rounded border px-1 text-sm"
            />
            <button
              onClick={() => {
                onCreate(value);
                setValue("");
              }}
              className="rounded bg-black px-2 text-white"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BuilderNavbar() {
  const [organizations, setOrganizations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [pages, setPages] = useState([]);
  const [components, setComponents] = useState([]);
  const [elements, setElements] = useState([]);

  const [organization, setOrganization] = useState(null);
  const [project, setProject] = useState(null);
  const [page, setPage] = useState(null);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    orgApi.getAll().then(setOrganizations);
  }, []);

  useEffect(() => {
    if (organization) projectApi.getAll(organization.id).then(setProjects);
  }, [organization]);

  useEffect(() => {
    if (project) pageApi.getAll(project.id).then(setPages);
  }, [project]);

  useEffect(() => {
    if (page) componentApi.getAll(page.id).then(setComponents);
  }, [page]);

  useEffect(() => {
    if (component) elementApi.getAll(component.id).then(setElements);
  }, [component]);

  return (
    <div className="flex gap-3 border-b bg-white p-3">
      <Dropdown
        label="Org"
        items={organizations}
        selected={organization}
        onSelect={setOrganization}
        onCreate={(name) =>
          orgApi
            .create({ name })
            .then((o) => setOrganizations([...organizations, o]))
        }
        onDelete={(id) =>
          orgApi
            .remove(id)
            .then(() =>
              setOrganizations(organizations.filter((o) => o.id !== id))
            )
        }
      />

      <Dropdown
        label="Project"
        disabled={!organization}
        items={projects}
        selected={project}
        onSelect={setProject}
        onCreate={(name) =>
          projectApi
            .create({ name, organizationId: organization.id })
            .then((p) => setProjects([...projects, p]))
        }
        onDelete={(id) =>
          projectApi
            .remove(id)
            .then(() => setProjects(projects.filter((p) => p.id !== id)))
        }
      />

      <Dropdown
        label="Page"
        disabled={!project}
        items={pages}
        selected={page}
        onSelect={setPage}
        onCreate={(name) =>
          pageApi
            .create({
              name,
              slug: name.toLowerCase().replace(/\s+/g, "-"),
              projectId: project.id,
            })
            .then((pg) => setPages([...pages, pg]))
        }
        onDelete={(id) =>
          pageApi
            .remove(id)
            .then(() => setPages(pages.filter((p) => p.id !== id)))
        }
      />

      <Dropdown
        label="Component"
        disabled={!page}
        items={components}
        selected={component}
        onSelect={setComponent}
        onCreate={(type) =>
          componentApi
            .create({ type, pageId: page.id, position: components.length + 1 })
            .then((c) => setComponents([...components, c]))
        }
        onDelete={(id) =>
          componentApi
            .remove(id)
            .then(() => setComponents(components.filter((c) => c.id !== id)))
        }
      />

      <Dropdown
        label="Element"
        disabled={!component}
        items={elements}
        selected={null}
        onSelect={() => {}}
        onCreate={(type) =>
          elementApi
            .create({
              type,
              componentId: component.id,
              position: elements.length + 1,
            })
            .then((e) => setElements([...elements, e]))
        }
        onDelete={(id) =>
          elementApi
            .remove(id)
            .then(() => setElements(elements.filter((e) => e.id !== id)))
        }
      />
    </div>
  );
}
