export class VehicleMessageConstant {
  public static THE_RENAVAM_YOU_ENTERED_IS_INVALID = Object.freeze({
    code: 'p6o3w4h8',
    message: 'The renavam you entered is invalid.',
  });

  public static THE_VEHICLE_YOU_ARE_LOOKING_FOR_DOES_NOT_EXIST = Object.freeze({
    code: 'w2j5eicp',
    message: 'The vehicle you are looking for does not exist.',
  });

  public static THE_VEHICLE_YOU_ARE_TRYING_TO_UPDATE_DOES_NOT_EXIST =
    Object.freeze({
      code: 'ysegdh50',
      message: 'The vehicle you are trying to update does not exist.',
    });

  public static THE_VEHICLE_YOU_ARE_TRYING_TO_DELETE_DOES_NOT_EXIST =
    Object.freeze({
      code: '0zc1d6vh',
      message: 'The vehicle you are trying to delete does not exist.',
    });

  public static THE_VALUE_YOU_ENTERED_IS_ALREADY_REGISTERED(field: string) {
    return Object.freeze({
      code: 's2j1x4d9',
      message: `The ${field} you entered is already registered.`,
    });
  }
}
