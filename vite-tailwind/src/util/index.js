

/**
 * 文件流下载
 * @param value
 * @param row
 * @param index
 * @returns {string}
 */
 export function streamDownload(res, filename) {
    console.log('res', res)
    // 切割出文件名
    // 解码
    console.log('fileName', filename)
    // 设置type类型
    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; application/octet-stream'
    })
    const fileUrl = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = fileUrl
    console.log('url', fileUrl)
    a.setAttribute('download', filename)
    a.style.display = 'none'
    a.click()
    a.remove()
  }
  