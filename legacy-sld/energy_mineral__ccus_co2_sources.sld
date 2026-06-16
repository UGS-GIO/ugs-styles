<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>energy_mineral:ccus_co2_sources</sld:Name>
        <sld:UserStyle>
            <sld:Name>energy_minerals_co2_sources_style</sld:Name>
            <sld:Title>CO2_Sources</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:Abstract>CO2_Sources by industry and emissions</sld:Abstract>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>agriculture</sld:Name>
                    <sld:Title>Agriculture</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>Agriculture</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#A52A2A</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>cement_lime</sld:Name>
                    <sld:Title>Cement/Lime Plant</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>Cement/lime plant</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#008000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>coal_power</sld:Name>
                    <sld:Title>Coal Power Plant</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>Coal power plant</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#800080</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>landfill</sld:Name>
                    <sld:Title>Landfill</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>Landfill</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FFFF00</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>manufacturing</sld:Name>
                    <sld:Title>Manufacturing</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>Manufacturing</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#000000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>military</sld:Name>
                    <sld:Title>Military</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>Military</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#0000FF</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>natural_resource</sld:Name>
                    <sld:Title>Natural Resource Extraction</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>Natural resource extraction</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FFA500</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>ng_pipeline</sld:Name>
                    <sld:Title>NG Pipeline Compressor Station</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>NG pipeline compressor station</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#FF0000</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>ng_power_plant</sld:Name>
                    <sld:Title>NG Power Plant</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>NG power plant</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#e834eb</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>refinery</sld:Name>
                    <sld:Title>Refinery</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>Refinery</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#34c6eb</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>university</sld:Name>
                    <sld:Title>University</sld:Title>
                    <ogc:Filter>
                        <ogc:PropertyIsEqualTo>
                            <ogc:PropertyName>description</ogc:PropertyName>
                            <ogc:Literal>University</ogc:Literal>
                        </ogc:PropertyIsEqualTo>
                    </ogc:Filter>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill>
                                    <sld:CssParameter name="fill">#85cc1b</sld:CssParameter>
                                </sld:Fill>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>
                                <ogc:Function name="Interpolate">
                                    <ogc:PropertyName>ghg_quantity__metric_tons_co2e_</ogc:PropertyName>
                                    <ogc:Literal>50000</ogc:Literal>
                                    <ogc:Literal>12</ogc:Literal>
                                    <ogc:Literal>4495601</ogc:Literal>
                                    <ogc:Literal>50</ogc:Literal>
                                </ogc:Function>
                            </sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>size_legend_1</sld:Name>
                    <sld:Title>Minimum Greenhouse Gas Emissions</sld:Title>
                    <sld:MinScaleDenominator>1.0E9</sld:MinScaleDenominator>
                    <sld:MaxScaleDenominator>1.000000001E9</sld:MaxScaleDenominator>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill/>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>5</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>size_legend_2</sld:Name>
                    <sld:Title>Maximum Greenhouse Gas Emissions</sld:Title>
                    <sld:MinScaleDenominator>1.0E9</sld:MinScaleDenominator>
                    <sld:MaxScaleDenominator>1.000000001E9</sld:MaxScaleDenominator>
                    <sld:PointSymbolizer>
                        <sld:Graphic>
                            <sld:Mark>
                                <sld:WellKnownName>circle</sld:WellKnownName>
                                <sld:Fill/>
                                <sld:Stroke/>
                            </sld:Mark>
                            <sld:Size>15</sld:Size>
                        </sld:Graphic>
                    </sld:PointSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

