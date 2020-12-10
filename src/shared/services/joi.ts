import { Joi } from "celebrate";
import joiObjectId from "joi-objectid";

namespace JoiObjectId {
	export function objectId(): any {}
}

const exportedJoi: typeof JoiObjectId & typeof Joi = Joi as any;

exportedJoi.objectId = joiObjectId(Joi);

export default exportedJoi;
