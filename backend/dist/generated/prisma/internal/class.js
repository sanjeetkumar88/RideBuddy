"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nenum Role {\n  RIDER\n  DRIVER\n}\n\nmodel User {\n  id            String         @id @default(uuid())\n  email         String         @unique\n  password      String\n  role          Role           @default(RIDER)\n  driverProfile DriverProfile?\n  createdAt     DateTime       @default(now())\n  updatedAt     DateTime       @updatedAt\n}\n\nmodel DriverProfile {\n  id           String   @id @default(uuid())\n  userId       String   @unique\n  user         User     @relation(fields: [userId], references: [id])\n  vehicleModel String\n  vehiclePlate String\n  vehicleColor String\n  createdAt    DateTime @default(now())\n  updatedAt    DateTime @updatedAt\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"driverProfile\",\"kind\":\"object\",\"type\":\"DriverProfile\",\"relationName\":\"DriverProfileToUser\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"DriverProfile\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"DriverProfileToUser\"},{\"name\":\"vehicleModel\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"vehiclePlate\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"vehicleColor\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"user\",\"driverProfile\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"data\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"create\",\"update\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"having\",\"_count\",\"_min\",\"_max\",\"User.groupBy\",\"User.aggregate\",\"DriverProfile.findUnique\",\"DriverProfile.findUniqueOrThrow\",\"DriverProfile.findFirst\",\"DriverProfile.findFirstOrThrow\",\"DriverProfile.findMany\",\"DriverProfile.createOne\",\"DriverProfile.createMany\",\"DriverProfile.createManyAndReturn\",\"DriverProfile.updateOne\",\"DriverProfile.updateMany\",\"DriverProfile.updateManyAndReturn\",\"DriverProfile.upsertOne\",\"DriverProfile.deleteOne\",\"DriverProfile.deleteMany\",\"DriverProfile.groupBy\",\"DriverProfile.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"userId\",\"vehicleModel\",\"vehiclePlate\",\"vehicleColor\",\"createdAt\",\"updatedAt\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"not\",\"contains\",\"startsWith\",\"endsWith\",\"email\",\"password\",\"Role\",\"role\",\"is\",\"isNot\",\"connectOrCreate\",\"upsert\",\"disconnect\",\"delete\",\"connect\",\"set\"]"),
    graph: "XxEgCgIAAEYAICwAAEQAMC0AAAYAEC4AAEQAMC8BAAAAATRAAD4AITVAAD4AIUEBAAAAAUIBAD0AIUQAAEVEIgEAAAABACALAQAAPwAgLAAAPAAwLQAAAwAQLgAAPAAwLwEAPQAhMAEAPQAhMQEAPQAhMgEAPQAhMwEAPQAhNEAAPgAhNUAAPgAhAQAAAAMAIAEAAAABACAKAgAARgAgLAAARAAwLQAABgAQLgAARAAwLwEAPQAhNEAAPgAhNUAAPgAhQQEAPQAhQgEAPQAhRAAARUQiAQIAAFoAIAMAAAAGACAFAAAHADAGAAABACADAAAABgAgBQAABwAwBgAAAQAgAwAAAAYAIAUAAAcAMAYAAAEAIAcCAABZACAvAQAAAAE0QAAAAAE1QAAAAAFBAQAAAAFCAQAAAAFEAAAARAIBCgAACwAgBi8BAAAAATRAAAAAATVAAAAAAUEBAAAAAUIBAAAAAUQAAABEAgEKAAANADABCgAADQAwBwIAAFMAIC8BAEoAITRAAEsAITVAAEsAIUEBAEoAIUIBAEoAIUQAAFJEIgIAAAABACAKAAAQACAGLwEASgAhNEAASwAhNUAASwAhQQEASgAhQgEASgAhRAAAUkQiAgAAAAYAIAoAABIAIAIAAAAGACAKAAASACADAAAAAQAgEQAACwAgEgAAEAAgAQAAAAEAIAEAAAAGACADFwAATwAgGAAAUQAgGQAAUAAgCSwAAEAAMC0AABkAEC4AAEAAMC8BADUAITRAADYAITVAADYAIUEBADUAIUIBADUAIUQAAEFEIgMAAAAGACAFAAAYADAWAAAZACADAAAABgAgBQAABwAwBgAAAQAgCwEAAD8AICwAADwAMC0AAAMAEC4AADwAMC8BAAAAATABAAAAATEBAD0AITIBAD0AITMBAD0AITRAAD4AITVAAD4AIQEAAAAcACABAAAAHAAgAQEAAE4AIAMAAAADACAFAAAfADAGAAAcACADAAAAAwAgBQAAHwAwBgAAHAAgAwAAAAMAIAUAAB8AMAYAABwAIAgBAABNACAvAQAAAAEwAQAAAAExAQAAAAEyAQAAAAEzAQAAAAE0QAAAAAE1QAAAAAEBCgAAIwAgBy8BAAAAATABAAAAATEBAAAAATIBAAAAATMBAAAAATRAAAAAATVAAAAAAQEKAAAlADABCgAAJQAwCAEAAEwAIC8BAEoAITABAEoAITEBAEoAITIBAEoAITMBAEoAITRAAEsAITVAAEsAIQIAAAAcACAKAAAoACAHLwEASgAhMAEASgAhMQEASgAhMgEASgAhMwEASgAhNEAASwAhNUAASwAhAgAAAAMAIAoAACoAIAIAAAADACAKAAAqACADAAAAHAAgEQAAIwAgEgAAKAAgAQAAABwAIAEAAAADACADFwAARwAgGAAASQAgGQAASAAgCiwAADQAMC0AADEAEC4AADQAMC8BADUAITABADUAITEBADUAITIBADUAITMBADUAITRAADYAITVAADYAIQMAAAADACAFAAAwADAWAAAxACADAAAAAwAgBQAAHwAwBgAAHAAgCiwAADQAMC0AADEAEC4AADQAMC8BADUAITABADUAITEBADUAITIBADUAITMBADUAITRAADYAITVAADYAIQ4XAAA4ACAYAAA7ACAZAAA7ACA2AQAAAAE3AQAAAAQ4AQAAAAQ5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQA6ACE-AQAAAAE_AQAAAAFAAQAAAAELFwAAOAAgGAAAOQAgGQAAOQAgNkAAAAABN0AAAAAEOEAAAAAEOUAAAAABOkAAAAABO0AAAAABPEAAAAABPUAANwAhCxcAADgAIBgAADkAIBkAADkAIDZAAAAAATdAAAAABDhAAAAABDlAAAAAATpAAAAAATtAAAAAATxAAAAAAT1AADcAIQg2AgAAAAE3AgAAAAQ4AgAAAAQ5AgAAAAE6AgAAAAE7AgAAAAE8AgAAAAE9AgA4ACEINkAAAAABN0AAAAAEOEAAAAAEOUAAAAABOkAAAAABO0AAAAABPEAAAAABPUAAOQAhDhcAADgAIBgAADsAIBkAADsAIDYBAAAAATcBAAAABDgBAAAABDkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BADoAIT4BAAAAAT8BAAAAAUABAAAAAQs2AQAAAAE3AQAAAAQ4AQAAAAQ5AQAAAAE6AQAAAAE7AQAAAAE8AQAAAAE9AQA7ACE-AQAAAAE_AQAAAAFAAQAAAAELAQAAPwAgLAAAPAAwLQAAAwAQLgAAPAAwLwEAPQAhMAEAPQAhMQEAPQAhMgEAPQAhMwEAPQAhNEAAPgAhNUAAPgAhCzYBAAAAATcBAAAABDgBAAAABDkBAAAAAToBAAAAATsBAAAAATwBAAAAAT0BADsAIT4BAAAAAT8BAAAAAUABAAAAAQg2QAAAAAE3QAAAAAQ4QAAAAAQ5QAAAAAE6QAAAAAE7QAAAAAE8QAAAAAE9QAA5ACEMAgAARgAgLAAARAAwLQAABgAQLgAARAAwLwEAPQAhNEAAPgAhNUAAPgAhQQEAPQAhQgEAPQAhRAAARUQiRQAABgAgRgAABgAgCSwAAEAAMC0AABkAEC4AAEAAMC8BADUAITRAADYAITVAADYAIUEBADUAIUIBADUAIUQAAEFEIgcXAAA4ACAYAABDACAZAABDACA2AAAARAI3AAAARAg4AAAARAg9AABCRCIHFwAAOAAgGAAAQwAgGQAAQwAgNgAAAEQCNwAAAEQIOAAAAEQIPQAAQkQiBDYAAABEAjcAAABECDgAAABECD0AAENEIgoCAABGACAsAABEADAtAAAGABAuAABEADAvAQA9ACE0QAA-ACE1QAA-ACFBAQA9ACFCAQA9ACFEAABFRCIENgAAAEQCNwAAAEQIOAAAAEQIPQAAQ0QiDQEAAD8AICwAADwAMC0AAAMAEC4AADwAMC8BAD0AITABAD0AITEBAD0AITIBAD0AITMBAD0AITRAAD4AITVAAD4AIUUAAAMAIEYAAAMAIAAAAAFMAQAAAAEBTEAAAAABBREAAFsAIBIAAF4AIEcAAFwAIEgAAF0AIEsAAAEAIAMRAABbACBHAABcACBLAAABACABAgAAWgAgAAAAAUwAAABEAgcRAABUACASAABXACBHAABVACBIAABWACBJAAADACBKAAADACBLAAAcACAGLwEAAAABMQEAAAABMgEAAAABMwEAAAABNEAAAAABNUAAAAABAgAAABwAIBEAAFQAIAMAAAADACARAABUACASAABYACAIAAAAAwAgCgAAWAAgLwEASgAhMQEASgAhMgEASgAhMwEASgAhNEAASwAhNUAASwAhBi8BAEoAITEBAEoAITIBAEoAITMBAEoAITRAAEsAITVAAEsAIQMRAABUACBHAABVACBLAAAcACABAQAATgAgBi8BAAAAATRAAAAAATVAAAAAAUEBAAAAAUIBAAAAAUQAAABEAgIAAAABACARAABbACADAAAABgAgEQAAWwAgEgAAXwAgCAAAAAYAIAoAAF8AIC8BAEoAITRAAEsAITVAAEsAIUEBAEoAIUIBAEoAIUQAAFJEIgYvAQBKACE0QABLACE1QABLACFBAQBKACFCAQBKACFEAABSRCIBAgQCAQEAAQAAAAMXAAcYAAgZAAkAAAADFwAHGAAIGQAJAQEAAQEBAAEDFwAOGAAPGQAQAAAAAxcADhgADxkAEAMCAQQFAQcIAQgJAQkKAQsMAQwOAw0PBA4RAQ8TAxAUBRMVARQWARUXAxoaBhsbChwdAh0eAh4gAh8hAiAiAiEkAiImAyMnCyQpAiUrAyYsDCctAiguAikvAyoyDSszEQ"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await import('node:buffer');
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map