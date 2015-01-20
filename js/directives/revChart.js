myApp.directive('revChart', function() {
    return {
        templateUrl: 'tpl/revChart.html',
        restrict: 'E',
        link:function($scope,element){

               var margin = {top: 30, right: 20, bottom: 30, left: 50},
                   width = 600 - margin.left - margin.right,
                   height = 270 - margin.top - margin.bottom;

               var x = d3.time.scale().range([0, width]);
               var y = d3.scale.linear().range([height, 0]);

               var xAxis = d3.svg.axis().scale(x)
                   .orient("bottom").ticks(5);

               var yAxis = d3.svg.axis().scale(y)
                   .orient("left").ticks(5);

               var valueline = d3.svg.line()
                   .x(function(d) { return x(d.date); })
                   .y(function(d) { return y(d.count); });

               var svg = d3.select(element[0])
                   .append("svg")
                   .attr("width", width + margin.left + margin.right)
                   .attr("height", height + margin.top + margin.bottom)
                   .append("g")
                   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


          $scope.$watch('revisions',function(newRevs){

              if(!newRevs)
                return false;




// Get the data

              var data = newRevs;

                data.forEach(function(d,i) {
                    d.count=i;
                });

                // Scale the range of the data
                x.domain(d3.extent(data, function(d) { return d.date; }));
                y.domain([0, d3.max(data, function(d) { return d.count; })]);

                svg.append("path")      // Add the valueline path.
                    .attr("d", valueline(data));

                svg.append("g")         // Add the X Axis
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis);

                svg.append("g")         // Add the Y Axis
                    .attr("class", "y axis")
                    .call(yAxis);



          });
        }
    };
});