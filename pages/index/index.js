const app = getApp()

Page({
  data: {
   numbers:[],
   chooseModeA: false,
   chooseModeB: false,
   pathLength: 0,
   time: 0
  },

  Achange:function() {
    this.setData({
      chooseModeA: !this.data.chooseModeA
    })
    console.log("ModeA:" + this.data.chooseModeA)
  },

  Bchange:function(){
    this.setData({
      chooseModeB: !this.data.chooseModeB
    })
    console.log("ModeB:" + this.data.chooseModeB)
  },

  onLoad:function() {
    var arr =  [[0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,1,0,0,0,0,0,0,0,2,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0]]
    this.setData({
      numbers: arr,
      time: 0,
      pathLength: 0
    })
  },

  clear: function() {
    console.log("=> ready")
    var arr = this.data.numbers
    for(var i = 0;i < 11;i++)
      for(var j = 0;j < 11;j++)
        if(arr[i][j] == 3 || arr[i][j] == 4 || arr[i][j] == 5)
          arr[i][j] = 0
    this.setData({
      numbers: arr,
      time: 0,
      pathLength: 0
    })
  },

  clearPath: function() {
    console.log("=> clear")
    var arr = this.data.numbers
    for(var i = 0;i < 11;i++)
      for(var j = 0;j < 11;j++)
        if(arr[i][j] == 4 || arr[i][j] == 5)
          arr[i][j] = 0
    this.setData({
      numbers: arr,
      time: 0,
      pathLength: 0
    })
  },

  setBlock:function(e) {
    console.log(e.target.id)
    var x = ((e.target.id).split(" "))[0]
    var y = ((e.target.id).split(" "))[1]
    var arr = this.data.numbers
    if(arr[x][y] == 0 || arr[x][y] == 4 || arr[x][y] == 5)
      arr[x][y] = 3
    else if(arr[x][y] == 3)
      arr[x][y] = 0
    this.setData({
      numbers: arr
    })
  },

  startSearch: function() {  
    console.log("=> start")
    var x1,x2,y1,y2
    var PF = require('../src/PathFinding')
    var mertax = [[0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0],      
                  [0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0,0]]
    var arr = [[0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0],      
               [0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0],
               [0,0,0,0,0,0,0,0,0,0,0]]
    for(var i = 0;i < 11;i++)
      for(var j = 0;j < 11;j++) {
        if(this.data.numbers[i][j] == 3)
          mertax[i][j] = 1
        if(this.data.numbers[i][j] == 4)
          arr[i][j] = 0
        else
          arr[i][j] = this.data.numbers[i][j]
        if(this.data.numbers[i][j] == 1) {
          x1 = i
          y1 = j
        }
        if(this.data.numbers[i][j] == 2) {
          x2 = i
          y2 = j
        }
      }
    this.setData({
      numbers: arr
    })
    console.log(x1,x2,y1,y2)
    var start = new Date().valueOf()
    var grid = new PF.Grid(mertax)
    var finder = new PF.AStarFinder({
      allowDiagonal: this.data.chooseModeA,
      dontCrossCorners: this.data.chooseModeB
    })
    var path = finder.findPath(y1,x1,y2,x2,grid)
    var end = new Date().valueOf()
    var time = end - start
    console.log(time)
    var pathLength = 0
    console.log(path)
    for(var i = 0;i < path.length - 1;i++) {
      if(i != 0)
        arr[path[i][1]][path[i][0]] = 4
      pathLength += Math.sqrt((path[i][0] - path[i + 1][0]) * (path[i][0] - path[i + 1][0]) + (path[i][1] - path[i + 1][1]) * (path[i][1] - path[i + 1][1]))
      this.setData({
        numbers: arr
      }) 
    }
    this.setData({
      pathLength: pathLength.toFixed(3),
      time: time.toFixed(3)
    })
    
  }
})