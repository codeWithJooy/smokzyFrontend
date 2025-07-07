import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../../style/Employees/editorder.css";
import { updateOrder } from "../../redux/action/orderAction";

const EditOrder = () => {
  const { orderId } = useParams();
  const navigate = useHistory();
  const { order } = useSelector((state) => state.EMPORDER);
  const user = useSelector((state) => state.USER);
  const step = useSelector((state) => state.STEP);
  const [status, setStatus] = useState("pending");
  const [preparedNotes, setPreparedNotes] = useState("");
  const [preparedImages, setPreparedImages] = useState([]);

  const stepStatusOptions = {
    prepare: [
      { value: "Preparing", label: "Preparing" },
      { value: "Prepared", label: "Prepared" },
    ],
    delivery: [
      { value: "Out for Delivery", label: "Out for Delivery" },
      { value: "Delivered", label: "Delivered" },
    ],
    collect: [
      { value: "Out For Collection", label: "Out For Collection" },
      { value: "Collected", label: "Collected" },
    ],
  };

  // const statusOptions = [
  //   { value: "pending", label: "Pending" },
  //   { value: "prepared", label: "Prepared" },
  // ];
  function getStatusOptions(stepType) {
    const normalizedStepType = stepType.toLowerCase();
    
    if (stepStatusOptions[normalizedStepType]) {
      return stepStatusOptions[normalizedStepType];
    }
  }

  const handleImageUpload = (e, setImages) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index, images, setImages) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Create FormData object
    const formData = new FormData();
    formData.append("orderId", order._id);
    formData.append("status", status);
    formData.append("notes", preparedNotes);
    formData.append("step", step.step);
    formData.append("staffId", user.uuid);
    // Append each image file
    preparedImages.forEach((image, index) => {
      formData.append(`images`, image); // Multer expects `images` field
    });

    console.log("Submitting FormData:", formData);
    let data = await updateOrder(formData);
    if (data) {
      navigate.push("/employeetask");
    }
    // Here you would typically send this data to your backend
    //navigate(-1); // Go back to previous page
  };

  return (
    <div className="main">
      <Header title={"Edit Order"} />

      <div className="editOrderContainer">
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Order No</label>
            <div className="orderNumber">{order.orderNumber}</div>
          </div>

          <div className="formGroup">
            <label htmlFor="status">Order Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="formControl"
            >
              {getStatusOptions(step.step).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Prepared Section */}
          {(status === "Prepared" || status==="Delivered" || status==="Collected") && (
            <div className="statusSection">
              {status=="Prepared" && <h3>Prepared Notes</h3>}
              {status=="Delivered" && <h3>Delivered Notes</h3>}
              {status=="Collected" && <h3>Collected Notes</h3>}
              <textarea
                className="notesTextarea"
                placeholder="Add Notes..."
                value={preparedNotes}
                onChange={(e) => setPreparedNotes(e.target.value)}
              />

              <div className="imageUploadSection">
                <label htmlFor="preparedImageUpload" className="uploadLabel">
                  Add Images
                </label>
                <input
                  id="preparedImageUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload(e, setPreparedImages)}
                  style={{ display: "none" }}
                />

                <div className="imagePreviewContainer">
                  {preparedImages.map((image, index) => (
                    <div key={`prepared-${index}`} className="imagePreviewItem">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Prepared ${index}`}
                        className="imagePreview"
                      />
                      <button
                        className="removeImageButton"
                        onClick={() =>
                          removeImage(index, preparedImages, setPreparedImages)
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="formActions">
            <button type="submit" className="submitButton">
              Save Changes
            </button>
            <button
              type="button"
              className="cancelButton"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default EditOrder;
