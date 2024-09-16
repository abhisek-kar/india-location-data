export interface State {
  id: string;
  name: string;
  districtIds: [string];
}

export interface City {
  id: string;
  name: string;
  stateId: string;
}

export interface District {
  id: string;
  name: string;
  stateId: string;
  blockIds: [string];
}

export interface Block {
  id: string;
  name: string;
  districtId: string;
  villageIds: [string];
}

export interface Village {
  id: string;
  name: string;
  blockId: string;
}
