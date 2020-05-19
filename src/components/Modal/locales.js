export default (modalData, attributionText) => {
  if(modalData) {
    const img = {
      src: modalData.thumbnail.path + "." + modalData.thumbnail.extension,
      alt: modalData.name,
      title: modalData.name,
      attributionText
    };
  
    const header = "Description";
    const closeButton = "Fermer";
  
    const description = {
      header: "Description",
      content: modalData.description ? modalData.description : "Description indisponible...",
      moreData: "Plus d'infos",
    };
  
    return {
      header,
      img,
      description,
      closeButton
    };
  }
};

export const uppercaseFirstChar = (word) => word[0].toUpperCase() + word.slice(1);
