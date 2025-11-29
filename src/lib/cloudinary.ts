import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(
    file: Buffer,
    filename: string,
    resourceType: 'image' | 'raw' = 'image'
): Promise<string> {
    return new Promise((resolve, reject) => {
        const uploadOptions: any = {
            resource_type: resourceType,
            folder: resourceType === 'image' ? 'diet-plans/images' : 'diet-plans/pdfs',
            public_id: filename,
        };

        // For PDFs, add flags to force download
        if (resourceType === 'raw') {
            uploadOptions.flags = 'attachment';
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result!.secure_url);
                }
            }
        );

        uploadStream.end(file);
    });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
    // Determine resource type based on folder
    const resourceType = publicId.includes('/pdfs/') ? 'raw' : 'image';

    await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
    });
}

export function extractPublicIdFromUrl(url: string): string {
    // Extract public ID from Cloudinary URL
    // Format: https://res.cloudinary.com/{cloud_name}/{resource_type}/upload/v{version}/{public_id}.{format}
    const parts = url.split('/upload/');
    if (parts.length < 2) return '';

    const pathParts = parts[1].split('/');
    // Remove version (v123456)
    const withoutVersion = pathParts.slice(1).join('/');
    // Remove file extension
    const publicId = withoutVersion.replace(/\.[^/.]+$/, '');

    return publicId;
}

export function getPublicUrl(publicId: string): string {
    // This is handled automatically by Cloudinary, just return the publicId
    return publicId;
}
