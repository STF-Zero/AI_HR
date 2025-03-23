export const uploadDocument = async (file, workspaceSlug) => {
    const formData = new FormData();
    formData.append('file', file); // 确保 'file' 是文件的字段名称

    try {
        const response = await fetch('http://localhost:3001/api/v1/document/upload', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Bearer 48NJ9EF-30P4XKD-KR28HHZ-MRCAYMY'
            },
            body: formData
        });

        const result = await response.json();
        console.log(result);

        const location = "custom-documents/" + result.documents[0].title + "-" + result.documents[0].id + ".json";
        console.log(location);
        try {
            const response2 = await fetch('http://localhost:3001/api/v1/workspace/'+workspaceSlug+'/update-embeddings', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': 'Bearer 48NJ9EF-30P4XKD-KR28HHZ-MRCAYMY',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "adds": [location]
                })
            })
            const result2 = await response2.json();
            console.log(result2);

        } catch (error) {
            console.error('Upload error:', error);
        }

    } catch (error) {
        console.error('Upload error:', error);
    }
}