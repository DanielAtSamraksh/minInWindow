// see http://stackoverflow.com/a/12195098/268040
// see testing

function minInWindow(windowSize, cmp /*optional cmp function*/) {
  if (!cmp) cmp = function(a,b){return a - b;};
  var nums = [];
  var is = [];
  var i = 0;
  var f = function(newNum){
    if (newNum !==undefined && !isNaN(newNum)) {
      // inserting
      while (nums.length > 0 && cmp(newNum, nums[nums.length - 1]) <= 0) {
        nums.pop();
        is.pop();
      }
      while (is.length > 0 && is[0] + f.windowSize <= i) {
        nums.shift();
        is.shift();
      }
      nums.push(newNum);
      is.push(i);
      i++;
    }
    return nums[0];
  };
  f.windowSize = windowSize;
  return f;
}

function maxInWindow(windowSize, cmp) {
  var cmp2 = cmp? function(a,b){return cmp(b,a);}: function(a,b){return b-a;};
  return minInWindow(windowSize, cmp2);
};


function test() {
  var f = minInWindow(3);
  if (!(
    f(1) == 1    // 1
    && f(2) == 1 // 1,2, min = 1
    && f(3) == 1 // 1,2,3, min = 1
    && f(4) == 2 // 2,3,4, min = 2
    && f() == 2)) { // 2,3,4, min = 3
    throw "fail";
  }
  var f = minInWindow(3, function(a,b) {return a-b;}); // with a comparison function
  if (!(
    f(1) == 1    // 1
    && f(2) == 1 // 1,2, min = 1
    && f(3) == 1 // 1,2,3, min = 1
    && f(4) == 2 // 2,3,4, min = 2
    && f() == 2)) { // 2,3,4, min = 3
    throw "fail";
  }
  return alert("pass");
}


