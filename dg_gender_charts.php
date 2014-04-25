<?php include 'inc/config.php'; ?>
<?php include 'inc/template_start.php'; ?>
<?php include 'inc/page_head.php'; ?>

<!-- Page content -->
<div id="page-content">
    <!-- Blank Header -->
    <div class="content-header">
        <div class="header-section">
            <h1>Bar and Pie Charts
                <br><small>data by gender</small>
            </h1>
        </div>
    </div>
    <!-- END Blank Header -->

    <!-- START Stacked Bar and Pie Chart -->
    <div class="row">
        <div class="col-sm-8">
            <!-- Bars Chart Block -->
            <div class="block full">
                <!-- Bars Chart Title -->
                <div class="block-title">
                    <h2><strong>Gender</strong> stacked sales chart</h2>
                </div>
                <!-- END Bars Chart Title -->

                <!-- Bars Chart Content -->
                <!-- Flot Charts (initialized in js/pages/compCharts.js), for more examples you can check out http://www.flotcharts.org/ -->
                <div id="gender-stacked-chart" class="chart"></div>
                <!-- END Bars Chart Content -->
            </div>
            <!-- END Bars Chart Block -->
        </div>
        <div class="col-sm-4">
            <!-- Bars Chart Block -->
            <div class="block full">
                <!-- Bars Chart Title -->
                <div class="block-title">
                    <h2><strong>Gender</strong> stacked sales chart</h2>
                </div>
                <!-- END Bars Chart Title -->

                <!-- Bars Chart Content -->
                <!-- Flot Charts (initialized in js/pages/compCharts.js), for more examples you can check out http://www.flotcharts.org/ -->
                <div id="gender-pie-chart" class="chart"></div>
                <!-- END Bars Chart Content -->
            </div>
            <!-- END Bars Chart Block -->
        </div>
    </div>
    <!-- END Stacked Bar and Pie Chart -->
</div>
<!-- END Page Content -->

<?php include 'inc/page_footer.php'; ?>
<?php include 'inc/template_scripts.php'; ?>
<script src="js/dgjs/dg_genderCharts.js"></script>
<script>$(function(){ GenderCharts.init(); });</script>
<?php include 'inc/template_end.php'; ?>