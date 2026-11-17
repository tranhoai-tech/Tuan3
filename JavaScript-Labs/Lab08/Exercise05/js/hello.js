/* Console thử nghiệm (mở F12 > Console rồi gõ lần lượt):
     count          -> 2
     output         -> "<br>Count = 2"
     var temp = count * 7;   -> undefined
     temp           -> 14
*/
document.write("this text was written from JS");
var count = 1;
document.write(" Count = " + count);

count++;
var output = "<br>Count = " + count;
document.write(output);
