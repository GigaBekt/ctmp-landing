export interface UploadedPhoto {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

export interface UploadPhotosStepProps {
  title: string;
  subTitle: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

export interface PhotoCategory {
  id: string;
  title: string;
  description: string;
  exampleImage: string;
  required: boolean;
}
