import { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gallery");
        if (Array.isArray(response.data)) {
          setGallery(response.data);
        } else if (response.data && Array.isArray(response.data.images)) {
          setGallery(response.data.images);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images");
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      alert("Image uploaded successfully!");
      setSelectedFile(null);
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/gallery");
      setGallery(Array.isArray(response.data) ? response.data : response.data.images);
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    }
  };

  // Apply the gradient background
  useEffect(() => {
    document.body.style.background = "linear-gradient(135deg, #e0b0ff, #d8aef8, #ffb6e6)";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.minHeight = "100vh";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    
    return () => {
      document.body.style.background = "";
      document.body.style.backgroundAttachment = "";
    };
  }, []);

  return (
    <div className="gallery-container" style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #e0b0ff, #d8aef8, #ffb6e6)",
      padding: "230px 20px 20px 20px",
      gap: "20px"
    }}>
      {/* Header Box */}
      <div style={{
        background: "white",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        width: "90%",
        maxWidth: "500px",
        margin: "0 auto 10px auto",
        zIndex: "10"
      }}>
        <h2 style={{
          color: "#6b3ea5",
          margin: "0 0 20px 0",
          fontSize: "28px",
        }}>Digital Art Gallery</h2>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          flexWrap: "wrap",
        }}>
          <label style={{
            background: "#8a63f2",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "500",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          }}>
            Choose File
            <input 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*"
              style={{ display: "none" }}
            />
          </label>
          
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            style={{
              background: selectedFile ? "#ff6b6b" : "#cccccc",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: selectedFile ? "pointer" : "not-allowed",
              fontWeight: "500",
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            Upload
          </button>
        </div>
      </div>

      {/* Gallery Content */}
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
        flex: "1",
      }}>
        {loading ? (
          <div style={{ textAlign: "center", color: "white", padding: "40px" }}>
            Loading artworks...
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", color: "white", padding: "20px" }}>
            {error}
          </div>
        ) : gallery.length > 0 ? (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}>
            {gallery.map((image, index) => (
              <div key={index} style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
              }}>
                <img
                  src={image.imageUrl || image.url}
                  alt={`Artwork ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                />
                <div style={{
                  padding: "10px",
                  textAlign: "center",
                  color: "#333",
                }}>
                  Artwork #{index + 1}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "white", padding: "40px" }}>
            No artworks found
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
