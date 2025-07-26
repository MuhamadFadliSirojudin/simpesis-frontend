export type Penilaian = {
  id: string;
  nama: string;
  gambarUrl: string;
  nilai?: string;
};

export type Modul = {
  id: number;
  nip: string;
  penyusun: string;
  topik: string;
  tujuan: string;
};

export type Siswa = {
  id: number;
  nama: string;
  semester: number;
  kelompok: string;
  totalNilai: number;
  waliKelas: string;
  fase: string;
};

export type Pembelajaran = {
  id: number;
  modul_id: number;
  nama: string;
};

export type NilaiKegiatan = {
  id: number;
  id_pembelajaran: number;
  id_siswa: number;
  id_modul: number;
  foto_karya: string;
  nilai: number;
  modul: Modul;
  pembelajaran: Pembelajaran;
  siswa: Siswa;
};

export type NilaiProps = {
  data: Pembelajaran[];
  onChangeNilai?: (id: number, value: string) => void;
  onChangeFile?: (id: number, file: File | null) => void;
  isLoading?: boolean;
};

export type BaseDataNilai = {
  id_modul: number;
  id_siswa: number;
};

export type SiswaRekapMingguan = {
  id: number;
  nama: string;
  jumlahNilai: number;
  rataRata: number;
}
