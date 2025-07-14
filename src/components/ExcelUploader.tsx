import { addOutcome } from "@/commands";
import { camelCase } from "lodash";
import { useState } from "react";
import * as XLSX from "xlsx"

function createObjectFromArrays<T>(
    keys: string[],
    values: T[]
  ): { [key: string]: T } {
    if (keys.length !== values.length) {
        //console.log(keys)
        //console.log(values)
      throw new Error("Keys and values arrays must have the same length, make sure that the first row has values.");
    }
  
    const result: { [key: string]: T} = {};
  
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = values[i];
      if(key.toLowerCase() != (value + "").toLowerCase()){
        result[key] = value;
      } 
    }
  
    return result;
  }


  const loadImpactFramework = (name:string,data:any)=>({
    name,
    outcome: data.reduce(
        (a:any, c:any) => {
          //console.log("a",a)
          //console.log("c",c)
          if (c == null) return a;
          if(a.filter((x:any)=>x.name === c.outcome).length){
            return a.map((x:any)=>{
              if(x.name === c.outcome){
                return {
                  ...x,
                  indicatori : [...x.indicatori,
                    {
                    name: c.indicatore ?? "",
                    description: c.descrizioneIndicatore?? "",
                    proxy: [
                      {
                        name: c.proxy?? "",
                        value: c.defaultValue?? "",
                        source: c.fonteproxy?? "",
                      },
                    ],
                  }]
                }
              }
              return x
            })
          }
          a.push({
            name: c.outcome?? "",
            description: c.descrizioneOutcome?? "",
            sdg: c.sdgLocalId?? "",
            indicatori: [
              {
                name: c.indicatore?? "",
                description: c.descrizioneIndicatore?? "",
                proxy: [
                  {
                    name: c.proxy?? "",
                    value: c.defaultValue?? "",
                    source: c.fonteproxy?? "",
                  },
                ],
              },
            ],
          });
          return a;
        },[]),
  }
);

  
const ExcelUploader = () =>{
    const [fileValue,setFileValue] = useState<any>()
    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        //setFileValue(event.target.files[0])
        //console.log(file)
        const reader = new FileReader();
        reader.onload = (evt) => {
            //console.log(evt)
            const bstr = evt?.target?.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames;
            const loadedData = {}
            wsname.forEach(async (e,idx) => {
                if (idx<2) return 
                const ws = wb.Sheets[e];
                const data: any = XLSX.utils.sheet_to_json(ws, { header: 1 });
                
                if (Array.isArray(data) && data.length) {
                    const keys = data[0]!.map((s: string) => camelCase(s.replaceAll(" ", "")));
                    const map = data.map((r, i) => {
                        if (i == 0 || !r.length) return null;
                        return createObjectFromArrays(keys, r);
                    }).filter(x=>x!=null && !!Object.keys(x).length);
                    Object.assign(loadedData,{[e]: loadImpactFramework(e,map)})
                    //upload degli outcome
                    //@ts-ignore
                    addOutcome(loadedData[e].outcome)
                }
            });  
            //console.log(loadedData);
        };
            
        reader.readAsBinaryString(file);
};

 return (
 <>
 <input 
    type="file"
    accept=".xls,.xlsx"
    onChange={handleFileUpload}
    value={fileValue}
    />
    <button onClick={()=>setFileValue("")}>clear</button>
    </>
 )
}

export default ExcelUploader