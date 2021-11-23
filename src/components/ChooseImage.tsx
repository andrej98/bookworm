import { useState } from 'react';
import ImageUploader from 'react-images-upload';

const ChooseImage = () => {
	const [images, setImages] = useState<File[]>([]);

	const updateFieldChanged = (files: File[]) => {
		setImages([...images, ...files]);
		images.forEach(image => console.log(image.name));
	};
	return (
		<div>
			<ImageUploader
				withIcon
				buttonText="Choose images"
				onChange={updateFieldChanged}
				imgExtension={['.jpg', '.gif', '.png', '.gif']}
				maxFileSize={5242880}
			/>
		</div>
	);
};

export default ChooseImage;
