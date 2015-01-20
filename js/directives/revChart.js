myApp.directive('revChart', function() {
    return {
        templateUrl: 'tpl/revChart.html',
        restrict: 'E',
        link:function($scope,element){

            var datalines = [];

               var margin = {top: 30, right: 20, bottom: 30, left: 50},
                   width = 600 - margin.left - margin.right,
                   height = 270 - margin.top - margin.bottom;

               var x = d3.time.scale().range([0, width]);
               var y = d3.scale.linear().range([height, 0]);

               var xAxis = d3.svg.axis().scale(x)
                   .orient("bottom").ticks(5);

               var yAxis = d3.svg.axis().scale(y)
                   .orient("left").ticks(5);



               var svg = d3.select(element[0])
                   .append("svg")
                   .attr("width", width + margin.left + margin.right)
                   .attr("height", height + margin.top + margin.bottom)
                   .append("g")
                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


           var initialised = false;

            var qLength = 0


          $scope.$watch('queries.length',function(newL,oldL){


              if(newL==0 || newL<=oldL){
                    return false;
              }




// Get the data
              var query = $scope.queries[newL-1];
              var data = $scope.queries[newL-1].data;

                data.forEach(function(d,i) {
                    d.count=i;
                });




              var valueline = d3.svg.line()
                  .x(function(d) { return x(d.date); })
                  .y(function(d) { return y(d.count); });



              datalines.push({
                  valueline:valueline,
                  data:data,
                  path:svg.append("path")      // Add the valueline path.
                      .attr("d", valueline(data))
                      .style("stroke",query.color)
              });


                console.log(datalines);
              // Scale the range of the data


              x.domain([
                  d3.min(datalines, function(d) { return d3.min(d.data, function(dd) { return dd.date; }); }),
                  d3.max(datalines, function(d) { return d3.max(d.data, function(dd) { return dd.date; }); })
              ]);
              y.domain([0, d3.max(datalines, function(d) { return d3.max(d.data, function(dd) { return dd.count; }); })]);


              datalines.forEach(function(valLine){
                  valLine.path.attr("d", valueline(valLine.data))
              });

              svg.selectAll("path")
              if(!initialised){

                  svg.append("g")         // Add the X Axis
                      .attr("class", "x axis")
                      .attr("transform", "translate(0," + height + ")")
                      .call(xAxis);

                  svg.append("g")         // Add the Y Axis
                      .attr("class", "y axis")
                      .call(yAxis);

                  initialised = true;
              }else{
                  svg.selectAll("g .y.axis")
                      .call(yAxis)

                  svg.selectAll("g .x.axis")
                      .call(xAxis);
              }



          });
        }
    };
});