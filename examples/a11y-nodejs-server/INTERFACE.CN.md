### **POST**: /get_a11y_data

请求参数

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>product_id</td>
    <td>云标签的数据索引key</td>
    <td>string</td>
  </tr>
</table>
返回参数
<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>statusCode</td>
    <td>状态码</td>
    <td>number</td>
  </tr>
  <tr>
    <td>message</td>
    <td>错误信息（如有）</td>
    <td>string</td>
  </tr>
  <tr>
    <td>data</td>
    <td>云标签数据</td>
    <td>{ label: A11yTag }</td>
  </tr>
</table>

### **POST**: /submit_label_mark

请求参数

<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>product_id</td>
    <td>云标签的数据索引key</td>
    <td>string</td>
  </tr>
  <tr>
    <td>page_id</td>
    <td>页面id</td>
    <td>string</td>
  </tr>
  <tr>
    <td>type</td>
    <td>操作类型</td>
    <td>'add' | 'update' | 'delete'</td>
  </tr>
  <tr>
    <td>label</td>
    <td>云标签数据</td>
    <td>A11yTag</td>
  </tr>
</table>
返回参数
<table>
  <tr>
    <th>字段名</th>
    <th>字段介绍</th>
    <th>字段类型</th>
  </tr>
  <tr>
    <td>statusCode</td>
    <td>状态码</td>
    <td>number</td>
  </tr>
  <tr>
    <td>message</td>
    <td>错误信息（如有）</td>
    <td>string</td>
  </tr>
  <tr>
    <td>data</td>
    <td>云标签数据</td>
    <td>{ label: A11yTag }</td>
  </tr>
</table>
<br/>

A11yTag类型参考 README.md => **A11yTag Interface**
