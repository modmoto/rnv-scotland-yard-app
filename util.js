import COLORS from "./StyledComponents/Colors";

export function convertVehicleToColor(station) {
    let backgroundColor = '';
    if (station === "Taxi") backgroundColor = COLORS.stationColors()[0];
    if (station === "Bus") backgroundColor = COLORS.stationColors()[1];
    if (station === "Metro") backgroundColor = COLORS.stationColors()[2];

    return backgroundColor
}