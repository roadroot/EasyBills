import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as os from "os";
import {join} from "path";
import {existsSync, mkdirSync, unlinkSync} from "fs";
import * as xlsx from "node-xlsx";

const fh = functions.storage.object();
export const helloWorld = fh.onFinalize(async (object) => {
  const path = join(os.tmpdir(), object.name??"");
  if (!existsSync(os.tmpdir())) {
    mkdirSync(os.tmpdir());
  }
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const bkt = admin.storage().bucket(object.bucket);
  const file = bkt.file(object.name??"");
  await file.download({destination: path});
  const xsl = xlsx.parse(path);
  let columnNames = 0;
  while (xsl[0].data[columnNames][0] != "Code commune") {
    columnNames++;
  }

  let dataStart = columnNames+1;
  while (xsl[0].data[dataStart].length == 0) {
    dataStart++;
  }

  let dataEnd = dataStart;
  while (xsl[0].data[dataEnd].length == xsl[0].data[dataStart].length) {
    const cid = xsl[0].data[dataEnd][0];
    const data: {[id: string]: any;} = {};
    for (let i = 0; i<xsl[0].data[columnNames].length; i++) {
      const column = xsl[0].data[columnNames][i] as string;
      const dt = xsl[0].data[dataEnd++][i];
      if (typeof(dt) == "number") {
        data[column] = dt;
      } else if (dt == "string") {
        if (dt == "n.d.") {
          data.column = -1;
        } else {
          data[column] = 0;
        }
      }
    }
    if (typeof(cid) == "number") {
      const doc = admin.firestore().collection("Communes").doc(cid.toString());
      await doc.set(data);
    } else if (typeof(cid) == "string") {
      const doc = admin.firestore().collection("Communes").doc(cid);
      await doc.set(data);
    } else {
      console.log(typeof(cid));
      console.error(typeof(cid));
    }
  }
  unlinkSync(path);
});
