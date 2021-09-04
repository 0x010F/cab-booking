export function validateRequestForm({
  name,
  phone,
  programName,
  date,
  sourceAddress,
  destinationAddress,
}) {
  if (
    !name.trim() ||
    !phone.trim() ||
    !programName.trim() ||
    !date.trim() ||
    !sourceAddress.trim() ||
    !destinationAddress.trim()
  ) {
    return "Please fill all the fields";
  } else if (phone.length !== 10 || phone.match(/[a - z]/)) {
    return "Invalid Phone Number";
  }
  return null;
}
