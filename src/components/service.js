import axios from "axios";


 const service =axios.create({
      headers:{
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0',
      }
  })
export default service
