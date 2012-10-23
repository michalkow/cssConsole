cssConsole
========
cssConsole is a jquery plugin that allows you to transform DOM element into console/terminal like input.

Browser Support
--------

cssConsole has been tested and should work in
- Internet Explorer 6+
- Safari
- Firefox
- Chrome
- Opera

Examples
--------

You can find some examples [here](http://www.michalkowalkowski.com/cssConsole).

Usage
--------

Include cssConsole and its stylesheet on your page before the `</body>` tag

```html
<link href="cssConsole.min.css" type="text/css" rel="stylesheet">
<script src="/path/to/cssConsole.min.js"></script>
```
  			
Then just add it to one of DOMs elements

```html
<script>
$('#elementsID').cssConsole();
</script>
```			


API
--------
Settable Options

<table summary="Properties" width="100%">
<thead>
<tr>
<th>Option</th>
<th>Description</th>
<th>Data Type</th>
<th>Default</th>
</tr>
</thead>
<tbody>
<tr>
<td>type</td>
<td>Type of the input box (supports: 'text', 'password')</td>
<td>string</td>
<td>'text'</td>
</tr>						
<tr>
<td>inputId</td>
<td>If provided, sets the id for the input element</td>
<td>string</td>
<td>null</td>
</tr>						
<tr>
<td>inputName</td>
<td>If provided, sets the name for the input element</td>
<td>string</td>
<td>null</td>
</tr>						
<tr>
<td>inputValue</td>
<td>If provided, sets the value for the input element</td>
<td>string</td>
<td>null</td>
</tr>	
<tr>
<td>blinkingInterval</td>
<td>Sets blinking interval (in milliseconds) for the caret</td>
<td>integer</td>
<td>500</td>
</tr>						
<tr>
<td>preventEnter</td>
<td>If true, prevents default action on pressing Enter key</td>
<td>boolean</td>
<td>true</td>
</tr>							
<tr>
<td>charLimit</td>
<td>Sets limit of characters in the input (0 = no limit)</td>
<td>integer</td>
<td>0</td>
</tr>						
<tr>
<td>onEnter</td>
<td>Sets function to be executed on pressing Enter key</td>
<td>function</td>
<td>function (){ } </td>
</tr>
</tbody>
</table>

Methods

<table summary="Methods" width="100%">
<thead>
<tr>
<th>Method</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>reset</td>
<td>Resets value of the input field</td>
</tr>						
<tr>
<td>destroy</td>
<td>Removes plugin functionality</td>
</tr>						
</tbody>
</table>
				
License
-------
cssConsole plugin is released under [MIT license](http://opensource.org/licenses/mit-license.php).

Credits
-------
cssConsole plugin was created by [Michał Kowalkowski](https://github.com/michalkow). You can contact me at [kowalkowski.michal@gmail.com](mailto:kowalkowski.michal@gmail.com)
