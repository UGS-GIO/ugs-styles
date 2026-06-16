<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:sco2_grid_summary</sld:Name>
        <sld:UserStyle>
            <sld:Name>sco2_grid_summary_style</sld:Name>
            <sld:Title>SCO2 Bivariate - Blue/Red</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:FeatureTypeStyle>
                <sld:Name>not_evaluated</sld:Name>
                <sld:Rule>
                    <sld:Name>bivariate_nodata</sld:Name>
                    <sld:Title>Not Evaluated</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsNull>
                            <ogc:PropertyName>capacity_mtco2</ogc:PropertyName>
                        </ogc:PropertyIsNull>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffffff</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.3</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#999999</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">4.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
            <sld:FeatureTypeStyle>
                <sld:Name>bivariate</sld:Name>
                <sld:Rule>
                    <sld:Name>bivariate_0_0</sld:Name>
                    <sld:Title>High Cap / Low Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#64acbe</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>bivariate_0_1</sld:Name>
                    <sld:Title>High Cap / Mid Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#627f8c</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>bivariate_0_2</sld:Name>
                    <sld:Title>High Cap / High Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#574249</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>bivariate_1_0</sld:Name>
                    <sld:Title>Mid Cap / Low Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#b0d5df</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>bivariate_1_1</sld:Name>
                    <sld:Title>Mid Cap / Mid Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ad9ea5</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>bivariate_1_2</sld:Name>
                    <sld:Title>Mid Cap / High Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#985356</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>bivariate_2_0</sld:Name>
                    <sld:Title>Low Cap / Low Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e8e8e8</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>bivariate_2_1</sld:Name>
                    <sld:Title>Low Cap / Mid Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                            <ogc:PropertyIsGreaterThanOrEqualTo>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsGreaterThanOrEqualTo>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.67</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#e4acac</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>bivariate_2_2</sld:Name>
                    <sld:Title>Low Cap / High Cost</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>capacity_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                            <ogc:PropertyIsLessThan>
                                <ogc:PropertyName>cost_percentile</ogc:PropertyName>
                                <ogc:Literal>0.33</ogc:Literal>
                            </ogc:PropertyIsLessThan>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:PolygonSymbolizer>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#c85a5a</sld:CssParameter>
                            <sld:CssParameter name="fill-opacity">0.8</sld:CssParameter>
                        </sld:Fill>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#444444</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5</sld:CssParameter>
                        </sld:Stroke>
                    </sld:PolygonSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
            <sld:FeatureTypeStyle>
                <sld:Name>labels</sld:Name>
                <sld:Rule>
                    <ogc:Filter>
                        <ogc:PropertyIsGreaterThan>
                            <ogc:PropertyName>formation_count</ogc:PropertyName>
                            <ogc:Literal>0</ogc:Literal>
                        </ogc:PropertyIsGreaterThan>
                    </ogc:Filter>
                    <sld:TextSymbolizer>
                        <sld:Label>
                            <ogc:PropertyName>formation_count</ogc:PropertyName><![CDATA[ Fms]]></sld:Label>
                        <sld:Font>
                            <sld:CssParameter name="font-family">SansSerif</sld:CssParameter>
                            <sld:CssParameter name="font-size">13</sld:CssParameter>
                            <sld:CssParameter name="font-style">normal</sld:CssParameter>
                            <sld:CssParameter name="font-weight">bold</sld:CssParameter>
                        </sld:Font>
                        <sld:LabelPlacement>
                            <sld:PointPlacement>
                                <sld:AnchorPoint>
                                    <sld:AnchorPointX>0.5</sld:AnchorPointX>
                                    <sld:AnchorPointY>0.5</sld:AnchorPointY>
                                </sld:AnchorPoint>
                            </sld:PointPlacement>
                        </sld:LabelPlacement>
                        <sld:Halo>
                            <sld:Radius>3</sld:Radius>
                            <sld:Fill>
                                <sld:CssParameter name="fill">#000000</sld:CssParameter>
                                <sld:CssParameter name="fill-opacity">0.85</sld:CssParameter>
                            </sld:Fill>
                        </sld:Halo>
                        <sld:Fill>
                            <sld:CssParameter name="fill">#ffffff</sld:CssParameter>
                        </sld:Fill>
                        <sld:VendorOption name="partials">true</sld:VendorOption>
                        <sld:VendorOption name="goodnessOfFit">0</sld:VendorOption>
                    </sld:TextSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

