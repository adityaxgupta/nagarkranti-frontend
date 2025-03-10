import React, { useState } from "react";
import LocationPicker from "../../components/LocationPicker/LocationPicker";
import styles from "../../styles/pages/CreateGrievance.module.css";

const CreateGrievance = () => {
  const [grievanceType, setGrievanceType] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [area, setArea] = useState("");
  const [location, setLocation] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, 5); 
    setImages(files);
  };

  const handleLocationChange = (lat, lng) => {
    setLocation({ lat, lng });

    setArea(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      grievanceType,
      description,
      images,
      area,
      location,
    };
    console.log("Form Data:", formData);
  };

  return (
    <div className={styles.createGrievancePage}>
      <div className={styles.overlay}>
        <div className={styles.grievanceBox}>
          <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.grievanceForm}>
              <div className={styles.inputGroup}>
                <label>Type of Grievance*</label>
                <select
                  value={grievanceType}
                  onChange={(e) => setGrievanceType(e.target.value)}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Garbage">Garbage</option>
                  <option value="Roads">Roads</option>
                  <option value="Streetlights">Streetlights</option>
                  <option value="Water">Water</option>
                  <option value="Sewage">Sewage</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label>Description*</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain the issue in detail..."
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Upload Images (up to 5)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
                <div className={styles.imagePreview}>
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Area*</label>
                <input
                  type="text"
                  value={area}
                  readOnly
                  placeholder="Area will be auto-populated"
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Submit
              </button>
            </form>

            <div className={styles.mapContainer}>
              <label>Select Location on Map*</label>
              <LocationPicker onLocationChange={handleLocationChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGrievance;
