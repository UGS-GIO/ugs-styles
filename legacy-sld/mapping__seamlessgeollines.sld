<?xml version="1.0" encoding="UTF-8"?><sld:StyledLayerDescriptor xmlns:sld="http://www.opengis.net/sld" xmlns="http://www.opengis.net/sld" xmlns:gml="http://www.opengis.net/gml" xmlns:ogc="http://www.opengis.net/ogc" version="1.0.0">
    <sld:NamedLayer>
        <sld:Name>mapping:seamlessgeollines</sld:Name>
        <sld:UserStyle>
            <sld:Name>line</sld:Name>
            <sld:Title>Blue Line</sld:Title>
            <sld:IsDefault>1</sld:IsDefault>
            <sld:Abstract>A sample style that just prints out a blue line</sld:Abstract>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>Rule 1</sld:Name>
                    <sld:Title>Blue Line</sld:Title>
                    <sld:Abstract>A blue line with a 1 pixel width</sld:Abstract>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#0000FF</sld:CssParameter>
                        </sld:Stroke>
                    </sld:LineSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
        <sld:UserStyle>
            <sld:Name>mapping_500k_geologic_lines_style</sld:Name>
            <sld:Title>Utah_GeologicLines</sld:Title>
            <sld:FeatureTypeStyle>
                <sld:Name>name</sld:Name>
                <sld:Rule>
                    <sld:Name>contact__normal__concealed</sld:Name>
                    <sld:Title>contact, normal, concealed</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>contact</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>normal</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>concealed</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.26666666666666666</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">0.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 0.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>contact__normal__well_located</sld:Name>
                    <sld:Title>contact, normal, well located</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>contact</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>normal</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>well located</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.26666666666666666</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>fault__normal__approximately_located</sld:Name>
                    <sld:Title>fault, normal, approximately located</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>fault</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>normal</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>approximately located</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">0.26666666666666666</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">2.0 3.0 4.0 3.0 4.0 3.0 3.0 0.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>fault__normal__concealed</sld:Name>
                    <sld:Title>fault, normal, concealed</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>fault</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>normal</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>concealed</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">0.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 0.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>fault__normal__well_located</sld:Name>
                    <sld:Title>fault, normal, well located</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>fault</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>normal</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>well located</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>fault__thrust__approximately_located</sld:Name>
                    <sld:Title>fault, thrust, approximately located</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>fault</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>thrust</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>approximately located</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">3.0 3.0 6.0 3.0 3.0 0.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>fault__thrust__concealed</sld:Name>
                    <sld:Title>fault, thrust, concealed</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>fault</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>thrust</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>concealed</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
                            <sld:CssParameter name="stroke-dasharray">0.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0 2.0</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>fault__thrust__well_located</sld:Name>
                    <sld:Title>fault, thrust, well located</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>fault</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>thrust</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>well located</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-width">1.2</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>map_boundary______</sld:Name>
                    <sld:Title><![CDATA[map boundary,  ,  ]]></sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>map boundary</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal/>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal/>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.5333333333333333</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>marker_bed_____well_located</sld:Name>
                    <sld:Title>marker bed,  , well located</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>marker bed</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal/>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>well located</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#8400a8</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.26666666666666666</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>shoreline_____well_located</sld:Name>
                    <sld:Title>shoreline,  , well located</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>shoreline</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal/>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>well located</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#005ce6</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.26666666666666666</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>vein__gilsonite__well_located</sld:Name>
                    <sld:Title>vein, gilsonite, well located</sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>vein</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal>gilsonite</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal>well located</ogc:Literal>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#004da8</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.9333333333333332</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
                <sld:Rule>
                    <sld:Name>water_boundary______</sld:Name>
                    <sld:Title><![CDATA[water boundary,  ,  ]]></sld:Title>
                    <ogc:Filter>
                        <ogc:And>
                            <ogc:And>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>type</ogc:PropertyName>
                                    <ogc:Literal>water boundary</ogc:Literal>
                                </ogc:PropertyIsEqualTo>
                                <ogc:PropertyIsEqualTo>
                                    <ogc:PropertyName>subtype</ogc:PropertyName>
                                    <ogc:Literal/>
                                </ogc:PropertyIsEqualTo>
                            </ogc:And>
                            <ogc:PropertyIsEqualTo>
                                <ogc:PropertyName>modifier</ogc:PropertyName>
                                <ogc:Literal/>
                            </ogc:PropertyIsEqualTo>
                        </ogc:And>
                    </ogc:Filter>
                    <sld:LineSymbolizer>
                        <sld:Stroke>
                            <sld:CssParameter name="stroke">#00c5ff</sld:CssParameter>
                            <sld:CssParameter name="stroke-linecap">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-linejoin">round</sld:CssParameter>
                            <sld:CssParameter name="stroke-width">0.26666666666666666</sld:CssParameter>
                        </sld:Stroke>
                        <sld:PerpendicularOffset>0.0</sld:PerpendicularOffset>
                    </sld:LineSymbolizer>
                </sld:Rule>
            </sld:FeatureTypeStyle>
        </sld:UserStyle>
    </sld:NamedLayer>
</sld:StyledLayerDescriptor>

