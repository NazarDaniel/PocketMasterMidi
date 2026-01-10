import { SonicakePocketMasterDevice } from './sonicake-pocket-master';

const deviceMap = [
  {
    id: 'SonicakePocketMaster',
    class: SonicakePocketMasterDevice,
  },
];

export class DeviceLoader {
  static getInstance(deviceName: string) {
    const deviceClass = deviceMap.find((d) => d.id === deviceName);
    if (!deviceClass) return null;
    return new deviceClass.class(deviceClass.id);
  }
}
