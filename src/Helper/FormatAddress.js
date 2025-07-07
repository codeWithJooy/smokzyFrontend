  // Helper function to format address
  export const formatAddress = (address) => {
    return `${address.plotApartment}, ${address.streetAddress1}${
      address.streetAddress2 ? `, ${address.streetAddress2}` : ""
    }, ${address.city}, ${address.pin}`;
  };