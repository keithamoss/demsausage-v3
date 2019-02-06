from django.contrib.gis import measure
from django.contrib.gis.db.models.functions import Distance


def find_by_distance(search_point, distance_threshold_km, limit, qs):
    return qs.filter(geom__distance_lte=(search_point, measure.Distance(km=distance_threshold_km))).annotate(distance=Distance("geom", search_point)).order_by("distance")[:limit]


def getFoodDescription(stall):
    if stall is None or stall.noms is None:
        return ""

    descriptions = [{"key": "bbq", "descriptor": "sausage sizzle"},
                    {"key": "cake", "descriptor": "cake stall"},
                    {"key": "coffee", "descriptor": "coffee"},
                    {"key": "vego", "descriptor": "vegetarian options"},
                    {"key": "halal", "descriptor": "halal options"},
                    {"key": "bacon_and_eggs", "descriptor": "bacon and egg burgers"}]
    noms = []

    for description in descriptions:
        if description["key"] in stall.noms and stall.noms[description["key"]] is True:
            noms.append(description["descriptor"])

    if "free_text" in stall.noms and stall.noms["free_text"] is not None and len(stall.noms["free_text"]) > 0:
        noms.append("and additional options: {}".format(stall.noms["free_text"]))
    return ", ".join(noms)
