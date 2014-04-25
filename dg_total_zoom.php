<?php include 'inc/config.php'; ?>
<?php include 'inc/template_start.php'; ?>
<?php include 'inc/page_head.php'; ?>

<!-- Page content -->
<div id="page-content">
    <!-- Blank Header -->
    <div class="content-header">
        <div class="header-section">
            <h1>Total Sales...
                <br><small>with zoom</small>  
            </h1>
        </div>
    </div>
    <!-- END Blank Header -->

    <!-- Classic and Bars Chart -->
    <div class="row">
        <div class="col-sm-6">
            <!-- Bars Chart Block -->
            <div class="block full">
                <!-- Bars Chart Title -->
                <div class="block-title">
                    <h2><strong>Total Number of Sales</strong> accumulated over time</h2>
                </div>
                <!-- END Bars Chart Title -->

                <!-- Bars Chart Content -->
                <!-- Flot Charts (initialized in js/pages/compCharts.js), for more examples you can check out http://www.flotcharts.org/ -->
                <div id="placeholder" class="chart" style = "height:250px"></div>
                <!-- END Bars Chart Content -->
            </div>
            <!-- END Bars Chart Block -->
        </div>
    </div>
    <div class="row">
        <div class="col-sm-5">
            <!-- Bars Chart Block -->
            <div class="block full">
                <!-- Bars Chart Title -->
                <div class="block-title">
                    <h2><strong>Select Region</strong> to view on graph above</h2>
                </div>
                <!-- END Bars Chart Title -->

                <!-- Bars Chart Content -->
                <!-- Flot Charts (initialized in js/pages/compCharts.js), for more examples you can check out http://www.flotcharts.org/ -->
                <div id="overview" class="chart" style = "height:150px"></div>
                <!-- END Bars Chart Content -->
            </div>
            <!-- END Bars Chart Block -->
        </div>
    </div>
    <!-- END Classic and Bars Chart -->
</div>
<!-- END Page Content -->

<?php include 'inc/page_footer.php'; ?>
<?php include 'inc/template_scripts.php'; ?>
<script language="javascript" type="text/javascript" src="http://www.flotcharts.org/flot/jquery.flot.selection.js"></script>
<script src="js/dgjs/dg_totalZoomChart.js"></script>
<script>$(function(){ TotalZoomChart.init(); });</script>
<?php include 'inc/template_end.php'; ?>