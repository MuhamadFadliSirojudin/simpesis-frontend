import { useState } from "react";
import axios from "../../libs/axios";

const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus("Upload berhasil: ID " + res.data.fileId);
    } catch (err) {
      console.error(err);
      setStatus("Upload gagal");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Upload Gambar</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button type="submit">Upload</button>
      {status && <p>{status}</p>}
    </form>
  );
};

export default UploadForm;
