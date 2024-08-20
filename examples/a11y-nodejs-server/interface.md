### **POST**: /get_a11y_data

Request Parameters

<table>
  <tr>
    <th>Field Name</th>
    <th>Field Description</th>
    <th>Field Type</th>
  </tr>
  <tr>
    <td>product_id</td>
    <td>Cloud label data index key</td>
    <td>string</td>
  </tr>
</table>
Return Parameters
<table>
  <tr>
    <th>Field Name</th>
    <th>Field Description</th>
    <th>Field Type</th>
  </tr>
  <tr>
    <td>statusCode</td>
    <td>Status code</td>
    <td>number</td>
  </tr>
  <tr>
    <td>message</td>
    <td>Error message (if any)</td>
    <td>string</td>
  </tr>
  <tr>
    <td>data</td>
    <td>Cloud label data</td>
    <td>{ label: A11yTag }</td>
  </tr>
</table>

### **POST**: /submit_label_mark

Request Parameters

<table>
  <tr>
    <th>Field Name</th>
    <th>Field Description</th>
    <th>Field Type</th>
  </tr>
  <tr>
    <td>product_id</td>
    <td>Cloud label data index key</td>
    <td>string</td>
  </tr>
  <tr>
    <td>page_id</td>
    <td>Page ID</td>
    <td>string</td>
  </tr>
  <tr>
    <td>type</td>
    <td>Operation type</td>
    <td>'add' | 'update' | 'delete'</td>
  </tr>
  <tr>
    <td>label</td>
    <td>Cloud label data</td>
    <td>A11yTag</td>
  </tr>
</table>
Return Parameters
<table>
  <tr>
    <th>Field Name</th>
    <th>Field Description</th>
    <th>Field Type</th>
  </tr>
  <tr>
    <td>statusCode</td>
    <td>Status code</td>
    <td>number</td>
  </tr>
  <tr>
    <td>message</td>
    <td>Error message (if any)</td>
    <td>string</td>
  </tr>
  <tr>
    <td>data</td>
    <td>Cloud label data</td>
    <td>{ label: A11yTag }</td>
  </tr>
</table>
<br/>

A11yTag type reference README.md => **A11yTag Interface**
