export interface ComplaintListDto {
  id: number;
  title: string;
  resumedDescription: string;
  createdAt: string;
  deletedAt?: string | null;
}

export interface ComplaintDetailDto {
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  cpf: string;
  email: string;
}

export interface ComplaintUpdateDto {
  description: string;
}
