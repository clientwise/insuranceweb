"use client";
import React, { useState } from "react";
import Spacer from "@/src/components/Spacer";
import AgencyNoticeBoardTable from "@/src/components/pages/agencypayouts/agencypayouttable";
// import { Button, Input } from "@nextui-org/react";
// import { Colors } from "@/src/assets/colors";

const AgencyNoticeBoard = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     content_type: "",
//     content: "",
//     content_media: null,
//   });

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (event) => {
//     setFormData({
//       ...formData,
//       content_media: event.target.files[0],
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

    // const agency_id = localStorage.getItem("agency_id"); 

    // const formDataToSend = new FormData();
    // formDataToSend.append("title", formData.title);
    // formDataToSend.append("content_type", formData.content_type);
    // formDataToSend.append("content", formData.content);
    // formDataToSend.append("content_media", formData.content_media);
    // formDataToSend.append("agency_id", agency_id);


    //   const response = await fetch(
    //     "https://staging.api.mypolicymate.in/api/notice-board/create",
    //     {
    //       method: "POST",
    //       body: formDataToSend,
          
    //     }
    //   );

    //   if (response.ok) {
    //     // Handle successful submission, e.g., close the modal, show a success message
    //     console.log("Notice created successfully");
    //     setIsModalOpen(false); 
    //     setFormData({ 
    //       title: "",
    //       content_type: "",
    //       content: "",
    //       content_media: null,
    //     });
    //   } else {
    //     // Handle error, e.g., display an error message
    //     console.error("Failed to create notice");
    //   }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

  return (
    <div>
      <div className="text-black bg-pageBackground px-2 min-h-screen ">
        <Spacer size="sm" />
        <p className="text-lg font-normal font-rubik text-black ">NoticeBoard </p>
        <Spacer size="xs" />
        {/* <Button style={{ color:"#ffffff" }}
                  className="rounded-lg bg-yellow-500 text-white"
                  size="md" onClick={() => setIsModalOpen(true)} > Add Notice</Button> */}

        <div>
          <AgencyNoticeBoardTable />
        </div>


        {/* {isModalOpen && (
          <div className="modal box-shadow p-5" style={{borderRadius:"11px", backgroundColor:"#e3e3e3"}}>
            <div className="modal-content">
              <span className="close-button" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
              <h1>Create New Notice</h1>
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="title">Title:</label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>                
                <div>
                  <label htmlFor="content_type">Content Type:</label>
                  <input
                    type="text"
                    name="content_type"
                    value={formData.content_type}
                    onChange={handleInputChange}
                    required
                  />
                </div>                
                <div>
                  <label htmlFor="content">Content:</label>
                  
                  <Input
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="content_media">Content Media:</label>
                  <Input
                    type="file"
                    id="content_media"
                    name="content_media"
                    onChange={handleFileChange}
                  />
                </div>
                            <Spacer size="xs" />
                
                <Button style={{ color:"#ffffff" }}
                  className="rounded-lg bg-yellow-500 text-white"
                  size="md" type="submit">Submit</Button>
              </form>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AgencyNoticeBoard;