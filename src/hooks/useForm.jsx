import { useState } from "react";

const useForm = () => {
  const [location, setLocation] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState([]);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(Date.now);
  const [endDate, setEndDate] = useState(Date.now);
  const [imagen, setImagen] = useState(null);
  const [price, setPrice] = useState("");
  const [fileName, setFileName] = useState("Ninguna imagen seleccionada");

  return {
    location,
    setLocation,
    name,
    setName,
    type,
    setType,
    description,
    setDescription,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    imagen,
    setImagen,
    price,
    setPrice,
    fileName,
    setFileName,
  };
};

export default useForm;
