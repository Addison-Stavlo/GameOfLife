const preset1 = {
  size: 50,
  ruleType: "custom",
  isolationLimit: 3,
  suffocationLimit: 6,
  coords: [[25, 25], [24, 25], [25, 24], [24, 24], [26, 26]]
};

const preset2 = {
  size: 20,
  ruleType: "classic",
  isolationLimit: 3,
  suffocationLimit: 6,
  //prettier-ignore
  coords: [[6,3],[7,3],[8,3],[12,3],[13,3],[14,3],
            [4,5],[4,6],[4,7],[4,11],[4,12],[4,13],
            [9,5],[9,6],[9,7],[9,11],[9,12],[9,13],
            [11,5],[11,6],[11,7],[11,11],[11,12],[11,13],
            [16,5],[16,6],[16,7],[16,11],[16,12],[16,13],
            [6,8],[7,8],[8,8],[12,8],[13,8],[14,8],
            [6,10],[7,10],[8,10],[12,10],[13,10],[14,10],
            [6,15],[7,15],[8,15],[12,15],[13,15],[14,15]]
};

const preset3 = {
  size: 50,
  ruleType: "custom",
  isolationLimit: 2,
  suffocationLimit: 5,
  coords: [[25, 25], [24, 25], [25, 24], [24, 24]]
};

const preset4 = {
  size: 50,
  ruleType: "custom",
  isolationLimit: 2,
  suffocationLimit: 2,
  //prettier-ignore
  coords: [
      [25, 25],[24, 25],[25, 24],[24, 24],
      [25, 0],[24, 0],[25, 49],[24, 49],
      [0, 24],[0, 25],[49, 24],[49, 25]
    ]
};

const presets = [preset1, preset2, preset3, preset4];

export default presets;
