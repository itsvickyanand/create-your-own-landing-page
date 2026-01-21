const BASE = `${process.env.NEXT_PUBLIC_API_URL}/organizations`;

export const getAll = async () => {
  const res = await fetch(BASE);
  return res.json();
};

export const getOne = async (id) => {
  const res = await fetch(`${BASE}/${id}`);
  return res.json();
};

export const create = async (data) => {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const update = async (id, data) => {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const remove = async (id) => {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  return res.json();
};
