import { BaseDataNilai } from "../types";

export type InputObject = {
  [key: string]: File | number;
};

export type OutputItem = {
  id_pembelajaran: number;
  foto_karya?: string;
  nilai?: number;
  id_modul?: number;
  id_siswa?: number;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string); // base64 string
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function convertToStructuredArray(
  input: InputObject,
  baseData: BaseDataNilai
): Promise<OutputItem[]> {
  const tempMap = new Map<number, OutputItem>();

  for (const [key, value] of Object.entries(input)) {
    const match = key.match(/(foto|nilai)(\d+)$/);
    if (!match) continue;

    const [, type, idStr] = match;
    const id = Number(idStr);

    if (!tempMap.has(id)) {
      tempMap.set(id, { id_pembelajaran: id, ...baseData });
    }

    const item = tempMap.get(id)!;

    if (type === "foto" && value instanceof File) {
      item.foto_karya = await fileToBase64(value); // convert to base64
    } else if (type === "nilai") {
      item.nilai = Number(value);
    }
  }

  return Array.from(tempMap.values());
}
