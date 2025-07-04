import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityEndpointsService {
  constructor() {}

  public endpointapis: any = {
    getallemployeesApi: "common/getallemployeesApi",
    shiftdata: "common/shiftdata",
    shiftmanningdata: "common/shiftmanningdata",
    rolemenu: "common/rolemenu",

  insertactivities: "shiftactivities/insertactivities",
  getactivities: "shiftactivities/getactivities",

    getLstgunit1Parameters: "lstgunit1/parameters",

    gettgdcslstgunit1: "format/gettgdcslstgunit1",
    inserttgdcslstgunit1: "format/inserttgdcslstgunit1",

    gettgdcslstgunit2: "format/gettgdcslstgunit2",    
    inserttgdcslstgunit2: "format/inserttgdcslstgunit2",

    gettgdcslstgunit3: "format/gettgdcslstgunit3",
    inserttgdcslstgunit3: "format/inserttgdcslstgunit3",

    gettsiunit1: "format/gettsiunit1",
    inserttsiunit1: "format/inserttsiunit1",

    gettsiunit2: "format/gettsiunit2",
    inserttsiunit2: "format/inserttsiunit2",

    gettsiunit3: "format/gettsiunit3",
    inserttsiunit3: "format/inserttsiunit3",

    gethaldiaauxeqpmnt: "format/gethaldiaauxeqpmnt",
    inserthaldiaauxeqpmnt: "format/inserthaldiaauxeqpmnt",

    getlsislanding: "format/getlsislanding",
    insertlsislanding: "format/insertlsislanding",

    getboilerandbop: "format/getboilerandbop",
    insertboilerandbop: "format/insertboilerandbop",

    getboplogsheet: "format/getboplogsheet",
    insertboplogsheet: "format/insertboplogsheet",

    getboilerdamperstatus: "format/getboilerdamperstatus",
    insertboilerdamperstatus: "format/insertboilerdamperstatus",

    getboilerhpdpagitator: "format/getboilerhpdpagitator",
    insertboilerhpdpagitator: "format/insertboilerhpdpagitator",

    getboileridfanstatus: "format/getboileridfanstatus",
    insertboileridfanstatus: "format/insertboileridfanstatus"
  };
}
