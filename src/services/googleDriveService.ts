import { getAccessToken } from './firebaseAuth';

export interface DriveUploadedFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  createdTime?: string;
  size?: string;
}

/**
 * Upload a text or blob file directly to user's Google Drive
 */
export const uploadFileToDrive = async (
  fileName: string,
  content: Blob | string,
  mimeType: string = 'text/plain'
): Promise<DriveUploadedFile> => {
  const token = await getAccessToken();
  if (!token) {
    throw new Error('Not authenticated with Google Workspace. Please sign in with Google first.');
  }

  // Create multipart boundary upload
  const metadata = {
    name: fileName,
    mimeType: mimeType,
    description: 'Uploaded via AW Assignment Work - All Solved Notes App',
  };

  const form = new FormData();
  form.append(
    'metadata',
    new Blob([JSON.stringify(metadata)], { type: 'application/json' })
  );

  const fileBlob = typeof content === 'string' ? new Blob([content], { type: mimeType }) : content;
  form.append('file', fileBlob);

  const response = await fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,createdTime,size',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Drive upload failed:', errorText);
    throw new Error(`Failed to upload to Google Drive: ${response.statusText}`);
  }

  const data = await response.json();
  return data as DriveUploadedFile;
};

/**
 * List files created by this app in user's Drive
 */
export const listAppDriveFiles = async (): Promise<DriveUploadedFile[]> => {
  const token = await getAccessToken();
  if (!token) return [];

  const response = await fetch(
    'https://www.googleapis.com/drive/v3/files?pageSize=30&fields=files(id,name,mimeType,webViewLink,createdTime,size)&orderBy=createdTime desc',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    console.error('Failed to list Drive files');
    return [];
  }

  const data = await response.json();
  return data.files || [];
};

/**
 * Delete a file with safety confirmation
 */
export const deleteDriveFile = async (fileId: string, fileName: string): Promise<boolean> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google');

  const confirmed = window.confirm(
    `Are you sure you want to delete "${fileName}" from your Google Drive? This action cannot be undone.`
  );
  if (!confirmed) return false;

  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.ok;
};
