/* eslint-disable no-tabs */
/*
 * 向外部暴漏一个函数 ajax
 * @param {*} url 请求路径，默认为空
 * @param {*} data 请求参数，默认为空对象
 * @param {*} type 请求方法，默认为GET
*/
import axios from 'axios'
export default function ajax (url = '', data = {}, type = 'GET') {
  // 返回值是个 Promise 对象（异步返回的数据是response.data，而不是response）
  return new Promise(function (resolve, reject) {
    // （利用axios）异步执行ajax请求
    let promise // 这个内部的promise用来保存axios的返回值(promise对象)
    if (type === 'GET') {
      let dataStr = '' // 数据拼接字符串，将data连接到url
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url += '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    promise.then(response => {
      // 成功回调resolve()
      resolve(response.data)
    })
      .catch(error => {
        // 失败回调reject()
        reject(error)
      })
  })
}

// export function get (url) {
//   return new Promise(function (resolve, reject) {
//     axios.get(url).then(res => resolve(res.data)).catch(err => reject(err))
//   })
// }

// 另外一种封装方法
// export default function async(url = '', data = {}, type = 'GET', method = 'fetch') => {
// 	type = type.toUpperCase();

// 	if (type == 'GET') {
// 		let dataStr = ''; //数据拼接字符串
// 		Object.keys(data).forEach(key => {
// 			dataStr += key + '=' + data[key] + '&';
// 		})

// 		if (dataStr !== '') {
// 			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
// 			url = url + '?' + dataStr;
// 		}
// 	}

// 	if (window.fetch && method == 'fetch') {
// 		let requestConfig = {
// 			credentials: 'include',
// 			method: type,
// 			headers: {
// 				'Accept': 'application/json',
// 				'Content-Type': 'application/json'
// 			},
// 			mode: "cors",
// 			cache: "force-cache"
// 		}

// 		if (type == 'POST') {
// 			Object.defineProperty(requestConfig, 'body', {
// 				value: JSON.stringify(data)
// 			})
// 		}
// 		try {
// 			const response = await fetch(url, requestConfig);
// 			const responseJson = await response.json();
// 			return responseJson
// 		} catch (error) {
// 			throw new Error(error)
// 		}
// 	} else {
// 		return new Promise((resolve, reject) => {
// 			let requestObj;
// 			if (window.XMLHttpRequest) {
// 				requestObj = new XMLHttpRequest();
// 			} else {
// 				requestObj = new ActiveXObject;
// 			}

// 			let sendData = '';
// 			if (type == 'POST') {
// 				sendData = JSON.stringify(data);
// 			}

// 			requestObj.open(type, url, true);
// 			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 			requestObj.send(sendData);

// 			requestObj.onreadystatechange = () => {
// 				if (requestObj.readyState == 4) {
// 					if (requestObj.status == 200) {
// 						let obj = requestObj.response
// 						if (typeof obj !== 'object') {
// 							obj = JSON.parse(obj);
// 						}
// 						resolve(obj)
// 					} else {
// 						reject(requestObj)
// 					}
// 				}
// 			}
// 		})
// 	}
// }
