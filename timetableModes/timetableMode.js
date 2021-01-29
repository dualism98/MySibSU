
export const modes = {
    groupMode: { 
        getAllURL: '',
        timetableURL: '',
        lastSearch: []
    },
    teacherMode: { 
        getAllURL: '',
        timetableURL: '',
        lastSearch: []
    },
    placeMode: { 
        getAllURL: '',
        timetableURL: '',
        lastSearch: []
    },
  };

  // Set the locale once at the beginning of your app.
  
  export const getTimetableMode = (mode) => {
      let timetableMode = {}
      for (let key in modes[mode]){
          timetableMode[key] = modes[mode][key]
      }
      
      return timetableMode
  }
  