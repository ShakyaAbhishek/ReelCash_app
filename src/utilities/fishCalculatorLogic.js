export default function fishPointLogic(data) {
  console.warn("fish logic index page", JSON.stringify(data, undefined, 2));
  const regA = Number(data.reg_a);
  const regB = Number(data.reg_b);
  const regC = Number(data.reg_c);
  const coficientValue = Number(data.coeficient_value);
  const lengthFish = data.lengthFish;
  const fishPoint =
    data.species === "Black Crappie"
      ? Math.round(
        (regA + regB * lengthFish + regC * Math.exp(-lengthFish)) *
        coficientValue
      )
      : data.species === "Brook Trout (Speckled Trout)"
        ? Math.round(
          (lengthFish /
            (regA + regB * lengthFish + regC * Math.sqrt(lengthFish))) *
          coficientValue
        )
        : data.species === "Brown Trout"
          ? Math.round(
            (regA + regB * lengthFish + regC * Math.exp(lengthFish)) *
            coficientValue
          )
          : data.species === "Channel Catfish"
            ? Math.round(
              (regA +
                regB * Math.pow(lengthFish, 2) +
                regC * Math.pow(lengthFish, 0.5)) *
              coficientValue
            )
            : data.species === "Lake Trout"
              ? Math.round(
                (regA +
                  regB * Math.pow(lengthFish, 3) +
                  regC * Math.pow(lengthFish, 0.5)) *
                coficientValue
              )
              : data.species === "Largemouth Bass"
                ? Math.round(
                  (regA + regB * lengthFish + regC * Math.exp(lengthFish)) *
                  coficientValue
                )
                : data.species === "Muskie"
                  ? Math.round(
                    (60.5 / lengthFish) *
                    (regA +
                      regB * Math.pow(lengthFish, 1.5) +
                      regC * Math.pow(lengthFish, 3)) *
                    coficientValue
                  )
                  : data.species === "Northern Pike "
                    ? Math.round(
                      (lengthFish /
                        (regA + regB * lengthFish + regC * Math.sqrt(lengthFish))) *
                      coficientValue
                    )
                    : data.species === "Perch (Yellow Perch)"
                      ? Math.round(
                        (regA +
                          regB * Math.pow(lengthFish, 2) +
                          regC * Math.exp(-lengthFish)) *
                        coficientValue
                      )
                      : data.species === "Rainbow Trout"
                        ? Math.round(
                          (regA +
                            regB * Math.exp(lengthFish) +
                            regC * Math.pow(lengthFish, 0.5)) *
                          coficientValue
                        )
                        : data.species === "Smallmouth Bass"
                          ? Math.round(
                            (lengthFish /
                              (regA + regB * lengthFish + regC * Math.sqrt(lengthFish))) *
                            coficientValue
                          )
                          : data.species === "Walleye"
                            ? Math.round(
                              (regA +
                                regB * Math.pow(lengthFish, 3) +
                                regC * Math.pow(lengthFish, 0.5)) *
                              coficientValue
                            )
                            : 0;
  console.warn("in side function value is ", fishPoint);
  return fishPoint;
}
