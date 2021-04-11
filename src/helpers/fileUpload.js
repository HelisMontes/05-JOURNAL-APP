export const fileUpload = async ( file ) =>{
  const url = 'https://api.cloudinary.com/v1_1/dtfvtiret/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file )
  try {
    const result = await fetch( url, {
      method: 'POST',
      body: formData
    });
    if ( result.ok ){
      const { secure_url } = await result.json();
      return secure_url
    } else{
      throw await result.json()
    }
  } catch (error) {
    throw error
  }
}