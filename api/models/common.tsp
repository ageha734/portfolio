namespace GraphCMS;

model Asset {
  url: string;
}

model Tag {
  name: string;
}

model EnumValue {
  name: string;
}

model TypeInfo {
  enumValues?: EnumValue[];
}
