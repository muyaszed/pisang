import { Emitter } from "./Emitter.js";

export const emit = (ast) => Emitter.new(ast).emit();